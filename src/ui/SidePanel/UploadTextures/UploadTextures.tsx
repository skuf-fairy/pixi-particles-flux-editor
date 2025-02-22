import { UploadOutlined } from "@ant-design/icons";
import { Space, Upload, UploadFile } from "antd";
import { Assets } from "pixi.js";
import React, { useRef } from "react";
import { useTexturesStore } from "src/hooks/useTexturesStore";
import { ParticleTexture, TexturesStore } from "src/services/TexturesStore/TexturesStore";
import { Button } from "src/ui/kit/Button/Button";
import { BehaviorName } from "../BehaviorName/BehaviorName";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import "./UploadTextures.style.scss";

function mapConfigTexturesToAntdConfig(textureList: ParticleTexture[]): UploadFile[] {
  return textureList.map((t, key) => ({
    uid: key.toString(),
    name: t.name,
    status: "done",
    url: t.url,
    thumbUrl: t.url,
  }));
}

export function UploadTextures() {
  const texturesStore = useTexturesStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const fileList = mapConfigTexturesToAntdConfig(texturesStore.getTextureList());

  const handleUpload = async () => {
    if (!inputRef.current?.files) return;

    const file = inputRef.current.files[0];
    const url = URL.createObjectURL(file);

    await Assets.load(url);

    texturesStore.add({
      url: url,
      name: file.name,
    });
  };

  const handleRemove = (file: UploadFile) => {
    if (file.url) {
      texturesStore.drop(file.name);
      return true;
    }

    return false;
  };

  return (
    <ItemContainer>
      <BehaviorName name="Textures" />

      <Space direction="vertical">
        <Upload listType="picture" fileList={fileList} accept={TexturesStore.acceptMimeTypes} onRemove={handleRemove} />

        <Button onClick={() => inputRef.current?.click()}>
          <div className="upload-button__content">
            <UploadOutlined />
            <p>Upload</p>
          </div>
        </Button>
      </Space>

      <input
        ref={inputRef}
        type="file"
        accept={TexturesStore.acceptMimeTypes}
        className="upload-input"
        onChange={handleUpload}
      />
    </ItemContainer>
  );
}
