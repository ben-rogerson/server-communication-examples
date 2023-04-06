import type { Flora as FloraType } from "@serverTypes";

function Flora({ title, uses }: FloraType) {
  return (
    <>
      <h1 className="text-2xl">{title}</h1>
      <div>{uses}</div>
    </>
  );
}

export default Flora;
