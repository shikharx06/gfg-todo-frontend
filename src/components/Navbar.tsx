import {
  Button,
  cn,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  User,
} from '@nextui-org/react';
import { useSnapshot } from 'valtio';
import { authStore } from '../store/auth';

type MyNavbarProps = unknown;

export const MyNavbar = (props: MyNavbarProps) => {
  const authData = useSnapshot(authStore);

  return (
    <Navbar className="bg-default-100">
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <Link href="/">
          <p className="font-bold text-inherit">TODO APP</p>
        </Link>
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {/* <Link href="#">Login</Link> */}
          {authData.data && (
            <User
              name={authData.data?.fullName}
              description={authData.data?.email}
              avatarProps={{
                src:
                  'https://api.dicebear.com/8.x/initials/svg?seed=' +
                  authData?.data?.fullName,
              }}
            />
          )}
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            className={cn({
              hidden: !authData.data,
            })}
            onClick={() => {
              window.location.replace('/login');
            }}
          >
            Log out
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
