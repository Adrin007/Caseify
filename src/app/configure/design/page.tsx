/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import ImageConfigurator from "@/components/configurator";
import { db } from "@/lib/db";
interface PageProps {
    searchParams: {
        id?: string;
    };
}
const Design = async({ searchParams }: PageProps) => {
    const { id } = searchParams;
    const imageData = await db.configure.findUnique({
        where:{id}
    })
    const configId = imageData?.id || ""
    const imageUrl = imageData?.imageUrl || ""
    const imageHeight = imageData?.height || 500
    const imageWidth = imageData?.width || 500
    return (
        <ImageConfigurator configID={configId} url={imageUrl} height={imageHeight} width={imageWidth}/>
    );
};

export default Design;
