// const User = require('../models/User')


// exports.user_index_get = async(req, res) => {
//     try {
//         const userId = req.params.id; // Assuming the id parameter is passed in the URL
//         const user = await User.findById(userId); // Find the user by id

//         //   console.log(user);
//         res.render('profile/user', { user }); // Pass the user object to the view template
//     } catch (error) {
//         console.log(error.message);
//         res.send('Something went wrong');
//     }
// }
// exports.user_edit_get = async(req, res) => {
//     try {
//         const user = await User.findOne(req.user)
//         res.render('profile/edit', { user })
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// exports.user_edit_post = async(req, res) => {
//     try {
//         // console.log(req.body.id)
//         await User.findByIdAndUpdate(req.body.id, req.body)
//         res.redirect('/')
//     } catch (error) {
//         console.log(error.message)
//     }
// }



// exports.user_Profile_Get = async(req, res) => {
//     try {
//         const userId = req.params.user._id.trim();
//         const user = await User.findById(userId);

//         console.log(user);

//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         res.status(200).json(user); // res.status(200).json({ name: user.firstName });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send('Something went wrong');
//     }
// };





// // exports.user_Profile_Get = async(req, res) => {
// //     try {
// //         const userId = req.params.id; // Assuming the id parameter is passed in the URL
// //         const user = await User.findById(userId); // Find the user by id

// //         res.render('profile/user', { user }); // Pass the user object to the view template
// //     } catch (error) {
// //         console.log(error.message);
// //         res.send('Something went wrong');
// //     }
// // }


const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the authenticated user's ID is available in the req.user.id property
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Edit user profile
exports.editUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the authenticated user's ID is available in the req.user.id property
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
