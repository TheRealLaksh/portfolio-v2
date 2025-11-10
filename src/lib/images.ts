import { StaticImageData } from "next/legacy/image";

// --- Common Images & Placeholders ---
import ProfilePlaceholder from "../../public/images/profile-placeholder.png";
import ProjectPlaceholder from "../../public/images/project-placeholder.png";
import DefaultAvatar from "../../public/images/avatars/default-avatar.png";


// --- Export Object ---
export const Images: { [ key: string ]: StaticImageData } = {

  // Common
  ProfilePlaceholder,
  ProjectPlaceholder,
  DefaultAvatar,
};
