import PropTypes from 'prop-types'; 

function CompassLayout({ children }) {
  return (
    <div className="min-h-screen bg-white px-4 py-6 flex flex-col items-center justify-start relative">

      <div className="w-full max-w-md pt-20">
        {children}
      </div>
    </div>
  );
}

  CompassLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default CompassLayout;