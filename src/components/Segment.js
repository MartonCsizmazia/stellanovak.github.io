import '../assets/styles/segment.css';

const Segment = (props) => {

  return (
    <div className="segment" style={SegmentStyles.segment}>

      <img src={props.url} alt="Flowers in Chania"></img>
    </div>
  )
}

const SegmentStyles = {
  segment: {
    borderStyle: "solid" ,
    borderWidth: "5px 0px 5px 0px"
  }

};

export default Segment;
