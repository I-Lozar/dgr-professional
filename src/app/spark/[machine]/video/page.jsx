import VideoPage from "@/app/components/VideoPage/VideoPage";

export default function Page({ params }) {
  return <VideoPage machine={params.machine} />;
}
