import {
  ChartBar,
  House,
  LogOut,
  Trophy,
  User,
  Volleyball,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const Navbar = () => {
  const navbarItems = [
    { title: "Home", url: "/", icon: House },
    { title: "My League", url: "/", icon: Trophy },
    { title: "My Activities", url: "/", icon: Volleyball },
    { title: "My Stats", url: "/", icon: ChartBar },
    { title: "My Account", url: "/", icon: User },
    { title: "Log Out", url: "/log-out", icon: LogOut },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="p-4 pt-8">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <h1 className="mt-auto text-xl">User Name</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4 py-0">
        <SidebarMenu>
          {navbarItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
export default Navbar;
