# Database Design

# Database

MongoDB Atlas


# Collections

## Users

Stores student information.

Fields

- _id
- fullName
- email
- password
- profilePicture
- university
- registrationNumber
- department
- year
- phoneNumber
- bio
- skills []
- interests []
- createdAt
- updatedAt

---

## LostItems

Stores lost and found posts.

Fields

- _id
- userId
- title
- description
- category
- image
- location
- dateLost
- reward
- status
- contactNumber
- createdAt

---

## RoommatePosts

Fields

- _id
- userId
- budget
- preferredGender
- location
- foodPreference
- sleepSchedule
- cleanliness
- description
- createdAt

---

## TeamPosts

Fields

- _id
- userId
- eventName
- eventType
- requiredSkills []
- maxMembers
- description
- deadline
- createdAt

---

## Notifications

Fields

- _id
- receiverId
- senderId
- title
- message
- type
- isRead
- createdAt

---

## AIChats

Fields

- _id
- userId
- messages []
- createdAt

# Database Design

# Database

MongoDB Atlas

---

# Collections

## Users

Stores student information.

Fields

- _id
- fullName
- email
- password
- profilePicture
- university
- registrationNumber
- department
- year
- phoneNumber
- bio
- skills []
- interests []
- createdAt
- updatedAt

---

## LostItems

Stores lost and found posts.

Fields

- _id
- userId
- title
- description
- category
- image
- location
- dateLost
- reward
- status
- contactNumber
- createdAt

---

## RoommatePosts

Fields

- _id
- userId
- budget
- preferredGender
- location
- foodPreference
- sleepSchedule
- cleanliness
- description
- createdAt

---

## TeamPosts

Fields

- _id
- userId
- eventName
- eventType
- requiredSkills []
- maxMembers
- description
- deadline
- createdAt

---

## Notifications

Fields

- _id
- receiverId
- senderId
- title
- message
- type
- isRead
- createdAt

---

## AIChats

Fields

- _id
- userId
- messages []
- createdAt
