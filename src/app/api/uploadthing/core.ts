/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp"
import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "16MB" } })
  .input(z.object({configID:z.string().optional()}))
    .middleware(async ({ input }) => {
      return {input}
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const {configID} = metadata.input
      const res = await fetch(file.url)
      const buffer = await res.arrayBuffer()
      const imageMetadata = await sharp(buffer).metadata()
      const {width,height} = imageMetadata
      if(!configID){
        const configuration = await db.configure.create({
          data:{
            imageUrl:file.url,
            height:height||500,
            width:width||500,
          }
        })
        return {configID:configuration.id}
      }
      else{
        const updatedConfiguration = await db.configure.update({
          where:{
            id:configID
          },
          data:{
            croppedImageUrl:file.url
          }
        })
        return {configID:updatedConfiguration.id}
      }
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
