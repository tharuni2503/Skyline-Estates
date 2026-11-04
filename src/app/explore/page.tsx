import type { Metadata } from "next";
import ExploreClient from "@/components/explore/ExploreClient";
export const metadata:Metadata={title:"Explore the Skyline world | Skyline Estates",description:"A 3D miniature city of Skyline Estates residences."};
export default function Page(){return <ExploreClient/>;}
