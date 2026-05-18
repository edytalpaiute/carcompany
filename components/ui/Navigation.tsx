import { navItems } from "../../lib/constants";
export default function Navigation() {

  return (
    <nav className="">
      {<ul>
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>}
    </nav>
  )
}