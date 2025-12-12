import Header from "./Header";

export default function HeaderWrapper({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
