const fs = require('fs/promises');
// const { readFile, writeFile } = require('fs/promises');
const { v4 } = require('uuid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const writeContactsToFile = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await writeContactsToFile(contacts);
  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    ...body,
  };
  contacts.push(newContact);
  await writeContactsToFile(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };
  await writeContactsToFile(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
