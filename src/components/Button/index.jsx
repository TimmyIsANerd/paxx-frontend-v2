export default function Link({ children, ...props }) {
  return (
    <Link
      className="px-4 py-2 font-semibold text-white bg-gradient-to-br from-purple-600 to-purple-400 rounded-md"
      {...props}
    >
      {children}
    </Link>
  );
}