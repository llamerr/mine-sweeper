export type TForm = {
  handleSubmitCallback: (
    { sizeX, sizeY, holes }: { sizeX: number, sizeY: number, holes: number }
  ) => void;
}
