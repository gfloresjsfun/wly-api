import { Readable } from "stream";
import { getVideoDurationInSeconds } from "get-video-duration";
import { getAudioDurationInSeconds } from "get-audio-duration";
import { MediaType } from "@wly/types";

export const getMediaDurationFromReadable = async (
  mediaType: MediaType,
  readable: Readable
) =>
  mediaType === MediaType.Video
    ? await getVideoDurationInSeconds(readable)
    : mediaType === MediaType.Audio
    ? await getAudioDurationInSeconds(readable)
    : 0;
