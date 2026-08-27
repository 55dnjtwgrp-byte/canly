import { useRef, useState } from "react";
import type { Profile } from "../types";
import { resizeImageToDataUrl } from "../lib/resizeImage";

interface EditProfileModalProps {
  profile: Profile;
  onClose: () => void;
  onSave: (profile: Profile) => void;
}

const BIO_MAX = 160;

export function EditProfileModal({ profile, onClose, onSave }: EditProfileModalProps) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio);
  const [avatarDataUrl, setAvatarDataUrl] = useState(profile.avatarDataUrl);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setAvatarError("Please choose an image file.");
      return;
    }
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      setAvatarDataUrl(dataUrl);
      setAvatarError(null);
    } catch {
      setAvatarError("Couldn't load that image, try another.");
    }
  };

  const initials = displayName.trim().slice(0, 2).toUpperCase() || "?";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--profile" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 className="modal__title">Edit profile</h2>

        <button
          type="button"
          className="avatar-picker"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Change avatar"
        >
          {avatarDataUrl ? (
            <img src={avatarDataUrl} alt="" className="avatar-picker__img" />
          ) : (
            <span className="avatar-picker__initials">{initials}</span>
          )}
          <span className="avatar-picker__overlay">Change photo</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="visually-hidden"
        />
        {avatarError && <p className="form-error">{avatarError}</p>}

        <label className="form-field">
          <span className="form-field__label">Display name</span>
          <input
            type="text"
            className="form-field__input"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value.slice(0, 40))}
            placeholder="Your name"
          />
        </label>

        <label className="form-field">
          <span className="form-field__label">
            Bio <span className="form-field__count">{bio.length}/{BIO_MAX}</span>
          </span>
          <textarea
            className="form-field__input form-field__input--textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
            placeholder="Caffeine enthusiast. Currently obsessed with..."
            rows={3}
          />
        </label>

        <div className="modal__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => onSave({ displayName: displayName.trim(), bio: bio.trim(), avatarDataUrl })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
