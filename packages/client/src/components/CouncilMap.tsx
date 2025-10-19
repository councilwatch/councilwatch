interface CouncilMapProps {
  zipCode: string;
  setCouncilId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const CouncilMap = ({ zipCode, setCouncilId }: CouncilMapProps) => {
  // This is just a skeleton for the map module. Idea is for the state and setState to be
  // passed into the map component. If zipCode is an empty string it will show the fully
  // zoomed out map. If a valid zip is provided, it will zoom in to an area surrounding
  // it and have markers for relevant councils that the user can click on to set that
  // councilId as active. A list of relevant info can then be displayed next to the
  // map as it pertains to that council. Could also display info for the entire area
  // if a zip is provided but no councilId is set.

  return (
    <div>
      <p>{zipCode}</p>
      <button type="button" value={123456} onClick={(e) => setCouncilId(Number(e.currentTarget.value))}>
        Example Council Id: 123456
      </button>
    </div>
  );
};
