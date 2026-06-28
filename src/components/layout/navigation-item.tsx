import Link from "next/link";

type Props = {
  title: string;
  href: string;
};

export function NavigationItem({
  title,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
    >
      {title}
    </Link>
  );
}