import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa'; // Optional for check icon

const CompareButton = ({ product, addToCompare, removeFromCompare, isAddedToCompare }) => {
  const [isChecked, setIsChecked] = useState(isAddedToCompare);
  const [temporaryText, setTemporaryText] = useState(null); // Tracks temporary message

  const handleCompareClick = () => {
    if (isChecked) {
      // Remove from compare list
      removeFromCompare(product);
      setIsChecked(false);
      setTemporaryText('Removed');

      // Temporarily show "Removed" and revert back to "Compare"
      setTimeout(() => {
        setTemporaryText(null);
      }, 1000); // Show "Removed" for 1 second
    } else {
      // Add to compare list
      addToCompare(product);
      setIsChecked(true);
      setTemporaryText('Added');

      // Temporarily show "Added" and revert back to "Compare"
      setTimeout(() => {
        setTemporaryText(null);
      }, 1000); // Show "Added" for 1 second
    }
  };

  return (
    <Button
      variant={isChecked ? "success" : "outline-secondary"}
      onClick={handleCompareClick}
      className="compare-button"
    >
      {temporaryText ? (
        <>
          <FaCheck /> {temporaryText}
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={isChecked}
            readOnly
            style={{ marginRight: '5px' }}
          />
          Compare
        </>
      )}
    </Button>
  );
};

export default CompareButton;
