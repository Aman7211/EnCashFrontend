export default function EditUserForm({ editingUser, setEditingUser, updateUser }) {
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Edit User</h3>
      {/* Form Inputs */}
      <div className="flex gap-3">
        <button onClick={updateUser} className="...">Save Changes</button>
        <button onClick={() => setEditingUser(null)} className="...">Cancel</button>
      </div>
    </div>
  );
}
