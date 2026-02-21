-- BB Find a Friend - Database Schema
-- Run this script to create the database tables

-- Users who sign up for the app
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Personality test results (submitted via the Personality Test "Next" button)
CREATE TABLE IF NOT EXISTS personality_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  q1 INTEGER NOT NULL,
  q2 INTEGER NOT NULL,
  q3 INTEGER NOT NULL,
  q4 INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Chat groups
CREATE TABLE IF NOT EXISTS chat_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  avatar TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Members belonging to chat groups
CREATE TABLE IF NOT EXISTS group_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL REFERENCES chat_groups(id) ON DELETE CASCADE,
  member_name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- User reviews displayed on the home page
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Chat messages within groups
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL REFERENCES chat_groups(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
