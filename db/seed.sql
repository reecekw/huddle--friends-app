-- BB Find a Friend - Sample Data
-- Run this script after schema.sql to populate the database

-- Sample personality test results
INSERT INTO personality_results (q1, q2, q3, q4) VALUES
  (75, 4, 60, 70),
  (50, 3, 50, 50),
  (90, 6, 80, 85),
  (30, 1, 25, 20),
  (65, 5, 55, 60);

-- Sample chat groups (matches MOCK_GROUPS in ChatList.tsx)
INSERT INTO chat_groups (name, avatar) VALUES
  ('The Boys', '🏀'),
  ('Fortnite Quads', '🎮'),
  ('Marketplace peeps', '🏪'),
  ('Study Squad', '📚'),
  ('The Boys', '🎉');

-- Sample group members
INSERT INTO group_members (group_id, member_name) VALUES
  (1, 'Steve B.'), (1, 'John C'), (1, 'Karl G.'), (1, 'Josh D.'), (1, 'Phil F.'),
  (2, 'Steve B.'), (2, 'John C'), (2, 'Karl G.'), (2, 'Josh D.'), (2, 'Phil F.'),
  (3, 'Steve B.'), (3, 'John C'), (3, 'Karl G.'), (3, 'Josh D.'), (3, 'Phil F.'),
  (4, 'Kayla G.'), (4, 'Becca M.'), (4, 'Karl G.'), (4, 'Emma P.'),
  (5, 'Steve B.'), (5, 'John C'), (5, 'Karl G.'), (5, 'Josh D.'), (5, 'Phil F.');

-- Sample reviews (matches REVIEWS in Index.tsx)
INSERT INTO reviews (quote, name, location) VALUES
  ('I struggled to make friends, but through this app I have made lifelong friends!', 'Amanda', 'San Francisco'),
  ('I finally have friends to play pickup basketball with now.', 'Thomas', 'Cleveland'),
  ('I now have a full squad to play with on Fortnite.', 'LeBron', 'Los Angeles'),
  ('I feel like I finally have a support group.', 'Alice', 'Dallas'),
  ('I found gym bros finally.', 'Greg', 'Provo'),
  ('App helped me reconnect with an old friend by chance!', 'Ryan', 'Earth');

-- Sample chat messages (matches MOCK_MESSAGES in ChatConversation.tsx)
INSERT INTO messages (group_id, sender, text) VALUES
  (1, 'Steve B.', 'Hey everyone! Who''s online?'),
  (1, 'You', 'I''m here! What''s up?'),
  (1, 'John C', 'Same here. Anyone down to hang out tonight?'),
  (1, 'You', 'I''m free after 9, let''s do it!'),
  (1, 'Karl G.', 'Count me in 🤙'),
  (1, 'Phil F.', 'Same, where are we meeting?'),
  (1, 'You', 'How about the usual spot?');
