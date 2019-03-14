## @react-md/avatar

Create avatars to represent people or objects with images, icons, or text.
Different theme colors can also be applied for icons or text.

### Installation

```sh
$ npm install --save @react-md/avatar
```

It is generally recommended to also install the following packages since they
work hand-in-hand with this package:

```sh
$ npm install --save @react-md/theme \
    @react-md/typography \
    @react-md/list \
    @react-md/icon
```

### Including Styles

> If you have not done so already, please read the main documentation about
> #including-styles before continuing.

### Usage

One of the main use-cases will probably be to display a list of people with
specific avatars with them:

```tsx
import React from "react";
import { render } from "react-dom";
import { Avatar } from "@react-md/avatar";
import { List, ListItem } from "@react-md/list";

const people = [
  { name: "Logan Tyler", avatarUrl: "https://some-picture.com" },
  { name: "Trenton Berry", avatarUrl: "https://some-picture.com" },
  { name: "Damon Fletcher", avatarUrl: "https://some-picture.com" },
  { name: "Thomas Owen", avatarUrl: "https://some-picture.com" },
  { name: "Charity Henderson", avatarUrl: "https://some-picture.com" },
];

const App = () => (
  <List>
    {people.map(({ name, avatarUrl }, i) => (
      <ListItem
        id={`person-${i}`}
        key={i}
        leftAvatar={<Avatar src={avatarUrl} alt={`${name}'s avatar'`} />}
      >
        {name}
      </ListItem>
    ))}
  </List>
);

render(<App />, document.getElementById("root"));
```