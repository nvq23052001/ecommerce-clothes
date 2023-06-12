import { Card } from "@mui/material";
import "./index.scss";


const DealCard= ({
  icon,
  number,
  title,
  background,
  textColor,
}) => {
  return (
    <Card
      className="totalBox DealCard"
      sx={{ background: background, color: textColor }}
    >
      <p className="title">{title}</p>
      <div className="d-f ai-c">
        {icon?.name && (
          <div
            className="totalBox-icon"
            style={{
              backgroundColor: icon?.background,
              boxShadow: `rgb(255 163 25 / 25%) 0px 1px 4px, rgb(255 163 25 / 35%) 0px 3px 12px 2px`,
            }}
          >
            <i className={"fas " + icon?.name} />
          </div>
        )}

        <p className="totalBox-total" style={{ color: textColor }}>
          {number}
        </p>
      </div>
    </Card>
  );
};

export default DealCard;
