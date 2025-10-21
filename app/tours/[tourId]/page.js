import EachOneOfTour from "@/app/_components/EachOneOfTour";

import { getTour } from "@/app/_lib/data-service";

export default async function TourPage({ params }) {
  const { tourId } = await params;
  const tour = await getTour(tourId);

  return <EachOneOfTour tour={tour} />;
}
