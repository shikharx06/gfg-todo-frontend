import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  //   Link,
} from '@nextui-org/react';

interface TodoCardProps {
  _id: string;
  title: string;
  description: string;
  updatedAt: string;
  createdAt: string;
}

export const TodoCard = (props: TodoCardProps) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{props.title}</p>
          {/* <p className="text-small text-default-500">nextui.org</p> */}
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{props.description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <pre>{new Date(props.createdAt).toDateString()}</pre>
        {/* <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link> */}
      </CardFooter>
    </Card>
  );
};
