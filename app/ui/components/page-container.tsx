interface ContainerProps {
  children: React.ReactNode;
}
// reusable container for components
// removed max-w-7xl
// NOTE TODO: refactor or remove - currently only used for header 
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto w-full max-w-8xl">{children}</div>;
};

export default Container;
