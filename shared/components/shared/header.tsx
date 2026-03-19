'use client';

import React from 'react';
import {cn} from "@/lib/utils";

import {useRouter} from "next/navigation";
import Link from "next/link";

import {
  LogOut,
  Settings,
  User,
  Bell,
  Moon,
  Sun,
  ChevronDown, ChevronRight, FolderDot
} from 'lucide-react';

import {Button} from "@/shared/components/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/shared/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/shared/components/ui/dropdown-menu';

import {useUser} from "@/shared/hooks/use-user";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({className}) => {
  const router = useRouter();
  const isLoading = false;
  const user = {
    avatar: 'https://avatars.githubusercontent.com/u/80592031?v=4&size=64',
    name: 'name',
    email: 'email',
  };

  const handleLogout = async () => {
    // await logout();
    router.push('/login');
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  }

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between mx-auto px-2">
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-2">
        <div className="h-8 w-24 bg-muted animate-pulse rounded" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost" // прозрачная кнопка
              className="relative h-8 gap-2 px-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.avatar}
                  alt={user?.name}
                />
                <AvatarFallback>{user?.name || 'User'}</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleNavigation('/profile')}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>
                  <ChevronRight />
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleNavigation('/my-projects')}
              >
                <FolderDot className="mr-2 h-4 w-4" />
                <span>My Projects</span>
                <DropdownMenuShortcut>
                  <ChevronRight />
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleNavigation('/settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>
                  <ChevronRight />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/*<DropdownMenu>*/}
        {/*  <DropdownMenuTrigger asChild>*/}
        {/*    <Button variant="ghost" className="relative h-8 gap-2 px-2">*/}
        {/*      <Avatar className="h-8 w-8">*/}
        {/*        <AvatarImage src={user?.avatar} alt={user?.name} />*/}
        {/*        <AvatarFallback>{getInitials(user?.name || 'User')}</AvatarFallback>*/}
        {/*      </Avatar>*/}
        {/*      <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />*/}
        {/*    </Button>*/}
        {/*  </DropdownMenuTrigger>*/}

        {/*  <DropdownMenuContent className="w-56" align="end" forceMount>*/}
        {/*    <DropdownMenuLabel className="font-normal">*/}
        {/*      <div className="flex flex-col space-y-1">*/}
        {/*        <p className="text-sm font-medium leading-none">{user?.name}</p>*/}
        {/*        <p className="text-xs leading-none text-muted-foreground">*/}
        {/*          {user?.email}*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </DropdownMenuLabel>*/}

        {/*    <DropdownMenuSeparator />*/}

        {/*    <DropdownMenuGroup>*/}
        {/*      <DropdownMenuItem onClick={() => handleNavigation(`/profile/${user?.username}`)}>*/}
        {/*        <User className="mr-2 h-4 w-4" />*/}
        {/*        <span>Profile</span>*/}
        {/*        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
        {/*      </DropdownMenuItem>*/}

        {/*      <DropdownMenuItem onClick={() => handleNavigation('/settings')}>*/}
        {/*        <Settings className="mr-2 h-4 w-4" />*/}
        {/*        <span>Settings</span>*/}
        {/*        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
        {/*      </DropdownMenuItem>*/}
        {/*    </DropdownMenuGroup>*/}

        {/*    <DropdownMenuSeparator />*/}

        {/*    /!* Подменю с дополнительными опциями *!/*/}
        {/*    <DropdownMenuSub>*/}
        {/*      <DropdownMenuSubTrigger>*/}
        {/*        <span className="ml-2">More options</span>*/}
        {/*      </DropdownMenuSubTrigger>*/}
        {/*      <DropdownMenuPortal>*/}
        {/*        <DropdownMenuSubContent>*/}
        {/*          <DropdownMenuItem>Help</DropdownMenuItem>*/}
        {/*          <DropdownMenuItem>Feedback</DropdownMenuItem>*/}
        {/*          <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>*/}
        {/*        </DropdownMenuSubContent>*/}
        {/*      </DropdownMenuPortal>*/}
        {/*    </DropdownMenuSub>*/}

        {/*    <DropdownMenuSeparator />*/}

        {/*    <DropdownMenuItem*/}
        {/*      onClick={handleLogout}*/}
        {/*      className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"*/}
        {/*    >*/}
        {/*      <LogOut className="mr-2 h-4 w-4" />*/}
        {/*      <span>Log out</span>*/}
        {/*      <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>*/}
        {/*    </DropdownMenuItem>*/}
        {/*  </DropdownMenuContent>*/}
        {/*</DropdownMenu>*/}
      </div>
    </header>
  );
};


// interface Props {
//   className?: string;
// }

// export const Header: React.FC<Props> = ({className}) => {
//   const router = useRouter();
//
//   const username = 'danil';
//
//   const handleProfileClick = () => {
//     router.push(`/profile/${username}`);
//   }
//
//   return (
//     <header className={cn('', className)}>
//       <Button
//         className='mb-2'
//         onClick={handleProfileClick}
//       >
//         Profile
//       </Button>
//     </header>
//   );
// };