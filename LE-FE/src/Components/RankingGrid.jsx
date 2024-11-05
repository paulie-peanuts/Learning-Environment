import React from 'react';

const RankingGrid = ({ items, imgArr, drag, allowDrop, drop }) => {
  const tiers = [
    { label: 'Top Tier', className: 'top-tier' },
    { label: 'Middle Tier', className: 'middle-tier' },
    { label: 'Bottom Tier', className: 'bottom-tier' },
    { label: 'Worst Tier', className: 'worst-tier' },
  ];

  const numCells = 5;

  const renderGrid = () =>
    tiers.map((tier, rowIndex) => {
      const cells = [];

      for (let cellIndex = 0; cellIndex < numCells; cellIndex++) {
        if (cellIndex === 0) {
          // Row label
          cells.push(
            <div key={`label-${rowIndex}`} className="row-label">
              <h4>{tier.label}</h4>
            </div>
          );
        } else {
          const rankNum = numCells * rowIndex + cellIndex - rowIndex;
          const item = items.find((o) => o.ranking === rankNum);
          const image = item
            ? imgArr.find((img) => img.id === item.imageId)?.image
            : null;

          cells.push(
            <div
              key={`rank-${rankNum}`}
              id={`rank-${rankNum}`}
              onDrop={drop}
              onDragOver={allowDrop}
              className="rank-cell"
            >
              {image && (
                <img
                  id={`item-${item.id}`}
                  src={image}
                  draggable="true"
                  onDragStart={drag}
                  alt=""
                />
              )}
            </div>
          );
        }
      }

      return (
        <div key={`row-${rowIndex}`} className={`rank-row ${tier.className}`}>
          {cells}
        </div>
      );
    });

  return <div className="rankings">{renderGrid()}</div>;
};

export default RankingGrid;

/*const RankingGrid = ({items, imgArr, drag, allowDrop, drop }) => {

    const rankingGrid = [];
    const cellCollectionTop = [];
    const cellCollectionMiddle = [];
    const cellCollectionBottom = [];
    const cellCollectionWorst = [];

    function pushCellMarkupToArr(cellCollection, rankNum, rowLabel) {
        if (rankNum > 0) {
            var item = items.find(o => o.ranking === rankNum);
            cellCollection.push(<div id={`rank-${rankNum}`} onDrop={drop} onDragOver={allowDrop} className="rank-cell">
                {(item != null) ? <img id={`item-${item.id}`} src={imgArr.find(o => o.id === item.imageId)?.image} draggable="true" onDragStart={drag} /> 
                                : null}
            </div>);
        }
        else {
            cellCollection.push(<div className="row-label">
                <h4>{rowLabel}</h4>
            </div>);
        }
    }

    function createCellsForRow(rowNum) {
        var rankNum = 0;
        var currCollection = [];
        var label = "";
        const numCells = 5;

        for (var a = 1; a <= numCells; a++) {
            rankNum = (a === 1) ? 0 : (numCells * (rowNum - 1)) + a - rowNum;

            if (rowNum === 1) {
                currCollection = cellCollectionTop;
                label = "Top Tier";
            }
            else if (rowNum === 2) {
                currCollection = cellCollectionMiddle;
                label = "Middle Tier";
            }
            else if (rowNum === 3) {
                currCollection = cellCollectionBottom;
                label = "Bottom Tier";
            }
            else if (rowNum === 4) {
                currCollection = cellCollectionWorst;
                label = "Worst Tier";
            }
            pushCellMarkupToArr(currCollection, rankNum, label);

        }

    }

    function createCellsForRows() {
        const maxRows = 4;
        for (var row = 1; row <= maxRows; row++) {
            createCellsForRow(row);
        }
    }

    function createRowsForGrid() {

        rankingGrid.push(<div className="rank-row top-tier">{cellCollectionTop}</div>);
        rankingGrid.push(<div className="rank-row middle-tier">{cellCollectionMiddle}</div>);
        rankingGrid.push(<div className="rank-row bottom-tier">{cellCollectionBottom}</div>);
        rankingGrid.push(<div className="rank-row worst-tier">{cellCollectionWorst}</div>);

        return rankingGrid;
    }

    function createRankingGrid() {
        createCellsForRows();
        return createRowsForGrid();
    }

    return (
        <div className="rankings">
            {createRankingGrid()}
        </div>
            
    )

}
export default RankingGrid;*/