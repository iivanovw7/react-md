import { useState, Dispatch, SetStateAction } from "react";

import scrollIntoView from "../../scrollIntoView";
import useKeyboardMovement, {
  BaseKeyboardMovementOptions,
  ItemRef,
  MovementHandler,
} from "./useKeyboardMovement";
import { getItemId } from "./utils";
import { DEFAULT_GET_ITEM_VALUE, DEFAULT_VALUE_KEY } from "../../search/utils";

export type ActiveDescendantId = string;

/**
 *
 * @typeparam CE The HTMLElement type of the container element that handles the
 * custom keyboard movement.
 * @typeparam IE The HTMLElement type of each item within the container element
 * that can be focusable.
 */
export interface ActiveDescendantMovementProviders<
  CE extends HTMLElement,
  IE extends HTMLElement
> {
  itemRefs: ItemRef<IE>[];
  onKeyDown: MovementHandler<CE>;
  activeId: ActiveDescendantId;
  focusedIndex: number;
  setFocusedIndex: Dispatch<SetStateAction<number>>;
}

interface ActiveDescendantOptions<
  D = unknown,
  CE extends HTMLElement = HTMLElement,
  IE extends HTMLElement = HTMLElement
> extends BaseKeyboardMovementOptions<D, CE, IE> {
  /**
   * The base id that should be used to generate the `aria-activedescendant`
   * value id. This will be passed into the `getId` option.
   */
  baseId: string;

  /**
   * The function that should generate an id based on the provided `id` and
   * `index` of the item.
   */
  getId?(id: string, index: number): string;

  /**
   * The default index that should be "focused" when the component mounts. This is
   * set to `-1` by default so that it only gains a new "focused" index when the
   * container element is focused.
   */
  defaultFocusedIndex?: (() => number) | number;
}

/**
 * This hook allows for custom keyboard "focus" movement using the
 * `aria-activedescendant` movement pattern. This is generally used when the DOM
 * focus shouldn't actually change from the container element (like listboxes)
 * but you still need to indicate that another element is "focused" due to a key
 * press.
 *
 * To use this hook, you'll want to update the container element of all the
 * items to have an `aria-activedescendant={activeId}` attribute and
 * `onKeyDown={onKeyDown}` that are provided by this hook. The
 * `aria-activedescendant` will help screen readers known what element is
 * "focused" since the container element should never really lose focus during
 * these keyboard movement events.  Finally, you'll want to update each item
 * have an id that is the result of `getItem(baseId, index)` so that it matches
 * the `aria-activedescendant` value and then apply `ref={itemRefs[i]}`.
 * Unfortunately, this means that all the child items **must** either be an
 * HTMLElement or the ref is forwarded down to the HTMLElement.
 *
 * The `itemRefs` **must** be applied so that a new "focused" item can be
 * scrolled into view as needed.
 *
 * @typeparam D The type of each data item within the items list.
 * @typeparam CE The HTMLElement type of the container element that handles the
 * custom keyboard movement.
 * @typeparam IE The HTMLElement type of each item within the container element
 * that can be focusable.
 */
export default function useActiveDescendantMovement<
  D = unknown,
  CE extends HTMLElement = HTMLElement,
  IE extends HTMLElement = HTMLElement
>({
  baseId,
  getId = getItemId,
  defaultFocusedIndex = -1,
  items,
  onChange,
  getItemValue = DEFAULT_GET_ITEM_VALUE,
  valueKey = DEFAULT_VALUE_KEY,
  ...options
}: ActiveDescendantOptions<D, CE, IE>): ActiveDescendantMovementProviders<
  CE,
  IE
> {
  const [focusedIndex, setFocusedIndex] = useState(defaultFocusedIndex);
  const activeId = focusedIndex !== -1 ? getId(baseId, focusedIndex) : "";

  const [itemRefs, onKeyDown] = useKeyboardMovement<D, CE, IE>({
    ...options,
    valueKey,
    getItemValue,
    focusedIndex,
    items,
    onChange(data, itemRefs) {
      if (onChange) {
        onChange(data, itemRefs);
      }

      const { index, target } = data;
      const item = itemRefs[index] && itemRefs[index].current;
      if (item && target && target.scrollHeight > target.offsetHeight) {
        scrollIntoView(target, item);
      }

      setFocusedIndex(index);
    },
  });

  return {
    activeId,
    itemRefs,
    onKeyDown,
    focusedIndex,
    setFocusedIndex,
  };
}
