const Mercenary = require('../models/mercenary');
const Listing = require('../models/listing');

module.exports = {
  new: newMercenary,
  create,
  addToCast
};

function addToCast(req, res) {
  Listing.findById(req.params.id, function(err, listing) {
    listing.cast.push(req.body.mercenaryId);
    listing.save(function(err) {
      res.redirect(`/listings/${listing._id}`);
    });
  });
}

function create(req, res) {
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Mercenary.create(req.body, function (err, mercenary) {
    res.redirect('/mercenaries/new');
  });
}

function newMercenary(req, res) {
  Mercenary.find({}, function (err, mercenaries) {
    res.render('mercenaries/new', {
      title: 'Add Mercenary',
      mercenaries
    });
  })
}