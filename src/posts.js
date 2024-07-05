const casual = require("casual");

module.exports = Array.from({ length: 30 }, (v, i) => {
  const name = casual.first_name;
  const events = [
    "went to the gym",
    "had a great meal",
    "watched a movie",
    "read a book",
    "went shopping",
  ];
  const event = casual.random_element(events);

  const outcomes = [
    "had a lot of fun",
    "had an interesting experience",
    "learned something new",
    "met some interesting people",
    "had a relaxing day",
  ];
  const outcome = casual.random_element(outcomes);

  const comments = Array.from({ length: 6 }, () => ({
    content: casual.sentence,
    createdBy: casual.first_name,
    avatar: `https://i.pravatar.cc/150?img=${casual.integer(1, 70)}`,
  }));

  const randomWords = casual.words(40); // Generate 40 random words
  const description = `Today, I ${event} and ${outcome}. ${randomWords}`;

  return {
    id: i,
    title: `${name} ${event}`,
    createdBy: name,
    avatar: `https://i.pravatar.cc/150?img=${i}`,
    description: description,
    likes: 0,
    comments: comments,
  };
});
