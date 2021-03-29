var PcClass = require('../models/pcclass');


module.exports = {
addToRecList
};

function addToRecList(req, res) {
    Listing.findById(req.params.id, function(err, listing) {
      listing.recClass.push(req.body.pcclassId);
      listing.save(function(err) {
        res.redirect(`/listings/${listing._id}`);
      });
    });
  };
