import Token from "../Token";

const HOCLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Token />
    </div>
  );
};

export default HOCLayout;
