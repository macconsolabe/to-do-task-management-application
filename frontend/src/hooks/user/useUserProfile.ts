import { useState } from 'react';
import type { UpdateUserDto } from '../../services/api';
import { useUser } from '../../contexts/UserContext';

export function useUserProfile() {
  const { user, updateUser, error } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState<UpdateUserDto>({});

  // Initialize edit data when starting to edit
  const startEditing = () => {
    if (user) {
      setEditData({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        avatarUrl: user.avatarUrl || ''
      });
      setIsEditing(true);
    }
  };

  // Cancel editing and reset data
  const cancelEditing = () => {
    setEditData({});
    setIsEditing(false);
  };

  // Save profile changes
  const saveProfile = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      setIsSaving(true);
      
      // Filter out empty strings and unchanged values
      const updateData: UpdateUserDto = {};
      
      if (editData.name && editData.name !== user.name) {
        updateData.name = editData.name;
      }
      
      if (editData.email && editData.email !== user.email) {
        updateData.email = editData.email;
      }
      
      if (editData.phoneNumber !== user.phoneNumber) {
        updateData.phoneNumber = editData.phoneNumber || undefined;
      }
      
      if (editData.avatarUrl !== user.avatarUrl) {
        updateData.avatarUrl = editData.avatarUrl || undefined;
      }

      // Only update if there are changes
      if (Object.keys(updateData).length > 0) {
        await updateUser(updateData);
      }
      
      setIsEditing(false);
      return true;
    } catch (err) {
      console.error('Failed to save profile:', err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Update edit data
  const updateEditData = (field: keyof UpdateUserDto, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return {
    user,
    isEditing,
    isSaving,
    editData,
    error,
    startEditing,
    cancelEditing,
    saveProfile,
    updateEditData
  };
}
