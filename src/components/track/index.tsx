import styled from "styled-components";
import React from "react";
import TrackModel from "types/track.types";

interface BoxProp {
  selected?: boolean;
}

const Box = styled.div<BoxProp>`
  display: flex;
  height: 100px;
  width: 100%;
  color: whitesmoke;
  cursor: pointer;
  margin: 2% 0;
  @media (max-width: 650px) {
    width: 100%;
  }
  &:hover {
    transition: 0.5s all;
    ${prop =>
      prop.selected
        ? "background-color: #1ed76094"
        : "background-color: rgba(0, 0, 0, 0.1)"}
  }

  ${prop =>
    prop.selected
      ? "background-color: #1ed76094"
      : "background-color: transparent"}
`;

const SongImage = styled.img`
  width: 100px;
  height: 100px;
`;

export interface ITrackComponentProps {
  track: SpotifyApi.TrackObjectFull;
  selected: boolean;
  onClick: (track: TrackModel) => void;
}

export function TrackComponent(props: ITrackComponentProps) {
  // const [isSelected, setSelected] = useState(false);
  const toggle = () => {
    // setSelected(!isSelected);
    props.onClick(props.track);
  };
  const { track } = props;

  return (
    <Box selected={props.selected} onClick={toggle}>
      <SongImage src={track.album.images[0].url} />
      <div
        style={{
          display: "grid",
          alignItems: "center",
          padding: "0 2%",
          fontWeight: 500
        }}
      >
        <div>
          <b>{track.name}</b>
        </div>
        <div>{track.album.name}</div>
        <div>{track.artists[0].name}</div>
      </div>
    </Box>
  );
}
