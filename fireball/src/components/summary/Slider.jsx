import * as Slider from "@radix-ui/react-slider";
import "./styles.css";

const SliderDemo = ({ value, onValueChange }) => (
  <form>
    <Slider.Root
      className="SliderRoot"
      value={value}
      onValueChange={onValueChange}
      // defaultValue={[0, 500]}
      min={0}
      max={60000000}
      step={1}
      minStepsBetweenThumbs={1}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  </form>
);

export default SliderDemo;
