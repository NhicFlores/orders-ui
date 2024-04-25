interface ContainerProps {
  children: React.ReactNode;
}
// reusable container for components
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto w-full max-w-7xl">{children}</div>;
};

export default Container;
