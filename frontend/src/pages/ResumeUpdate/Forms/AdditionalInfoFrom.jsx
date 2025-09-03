import React from 'react';
import Input from '../../../components/Inputs/Input';
import { LuTrash2, LuPlus } from 'react-icons/lu';
import RatingInput from '../../../components/ResumeSections/RatingInput';

const AdditionalInfoFrom = ({ language, interests, updateArrayItem, addArrayItem, removeArrayItem }) => {
  return (
    <div className='px-5 pt-5 pb-5'>
      <h2 className='text-lg font-semibold text-gray-900 mb-4'>Additional Info</h2>

      <div className='mb-6'>
        <h3 className='text-md font-medium text-gray-800 mb-3'>Languages</h3>
        <div className='flex flex-col gap-4'>
          {language?.map((lang, index) => (
            <div
              key={index}
              className='border border-gray-200 rounded-lg p-4 relative shadow-sm'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                <Input
                  label="Language"
                  placeholder="e.g. English"
                  type="text"
                  value={lang.name || ""}
                  onChange={({ target }) =>
                    updateArrayItem("language", index, "name", target.value)
                  }
                />
                <RatingInput
                  label="Proficiency"
                  value={lang.progress || 0}
                  onChange={(value) =>
                    updateArrayItem("language", index, "progress", value)
                  }
                  total={5}
                  activeColor='#0ea5e9'
                  inactiveColor='#e0f2fe'
                />
              </div>

              {language.length > 1 && (
                <button
                  type='button'
                  className='absolute top-3 right-3 text-red-600 hover:text-red-800 transition-colors'
                  onClick={() => removeArrayItem("language", index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}

          <button
            type='button'
            className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 transition-colors'
            onClick={() => addArrayItem("language", { name: "", progress: 0 })}
          >
            <LuPlus /> Add Language
          </button>
        </div>
      </div>

      <div className='mb-3'>
        <h3 className='text-md font-medium text-gray-800 mb-3'>Interests</h3>
        <div className='flex flex-col gap-4'>
          {interests?.map((interest, index) => (
            <div
              key={index}
              className='border border-gray-200 rounded-lg p-4 relative shadow-sm'
            >
              <Input
                placeholder="e.g. Reading, Hiking, Cooking"
                type="text"
                value={interest || ""}
                onChange={({ target }) =>
                  updateArrayItem("interests", index, null, target.value)
                }
              />
              {interests.length > 1 && (
                <button
                  type='button'
                  className='absolute top-3 right-3 text-red-600 hover:text-red-800 transition-colors'
                  onClick={() => removeArrayItem("interests", index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}

          <button
            type='button'
            className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 transition-colors'
            onClick={() => addArrayItem("interests", "")}
          >
            <LuPlus /> Add Interests
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoFrom;