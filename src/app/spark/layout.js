import PostHeader from "@/app/components/PostHeader";

export default function SparkLayout({ children }) {
  return (
    <>
      <PostHeader />
      {children}
    </>
  );
}
