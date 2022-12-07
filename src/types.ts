import { Types } from "mongoose";

export enum MediaType {
  Audio = "audio",
  Video = "video",
}

export enum PlayableType {
  Show = "Show",
  Album = "Album",
}

export interface IPlayable {
  playable: Types.ObjectId;
  playableType: PlayableType;
}

export interface ITip {
  summary: string;
  details: string;
}

export enum Interest {
  painPoint = "painPoint",
  meditation = "meditation",
  yoga = "yoga",
}

export enum ActivityLevel {
  sedentary = "sedentary",
  low = "low",
  high = "high",
}
