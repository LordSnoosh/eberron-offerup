const Listing = require('../models/listing');
const Mercenary = require('../models/mercenary');

module.exports = {
    index,
    show,
    new: newListing,
    create
  };

  function index(req, res) {
    Listing.find({}, function(err, listings) {
      res.render('listings/index', { title: 'All Listings', listings });
    });
  }

  function show(req, res) {
    Listing.findById(req.params.id)
    .populate('party').exec(function(err, listing) {
      Mercenary.find(
        {_id: {$nin: listing.party}},
        function(err, mercenaries) {
          res.render('listings/show', { title: 'Listing Detail', listing, mercenaries });
        }
      );
    });
  };

  function newListing(req, res) {
    res.render('listings/new', { title: 'Add Listing' });
  };

  function create(req, res) {
    Listing.create(req.body, function(err, listing) {
        if (err) console.log(err);
        res.redirect('/listings');
    })
}

// function create(req, res) {
//     req.body.nowShowing = !!req.body.nowShowing;
//     for (let key in req.body) {
//       if (req.body[key] === '') delete req.body[key];
//     }
//     const listing = new Listing(req.body);
//     listing.save(function(err) {
//       if (err) return res.redirect('/listings/new');
//       console.log(listing);
//       res.redirect(`/listings/${listing._id}`);
//     });
