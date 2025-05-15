// import React, { useEffect, useState } from 'react';
// import { fetchCategories } from '../../../api/categories';

// const CategoryTypeInput = ({ categoryId, value, onChange }) => {
//     const [categories, setCategories] = useState([]);
//     const categoryTypes = categories.find(cat => cat.id === categoryId)?.categoryTypes || [];

//     useEffect(() => {
//         const loadCategories = async () => {
//             try {
//                 const { data } = await fetchCategories();
//                 setCategories(data);
//             } catch (err) {
//                 console.error(err.message);
//             }
//         };
//         loadCategories();
//     }, []);

//     useEffect(() => {
//         if (categoryId && !categoryTypes.find(type => type.id === value)) {
//             onChange('');
//         }
//     }, [categoryId, value, categoryTypes, onChange]);

//     return (
//         <div>
//             <label className="block">Category Type</label>
//             <select
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="border p-2 w-full rounded"
//                 disabled={!categoryTypes.length}
//                 required
//             >
//                 <option value="">Select Category Type</option>
//                 {categoryTypes.map(type => (
//                     <option key={type.id} value={type.id}>{type.name}</option>
//                 ))}
//             </select>
//             {!categoryTypes.length && (
//                 <p className="text-sm text-gray-500">No category types available for this category</p>
//             )}
//         </div>
//     );
// };

// export default CategoryTypeInput;

import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../../api/categories';

const CategoryTypeInput = ({ categoryId, value, onChange }) => {
    const [categories, setCategories] = useState([]);
    const categoryTypes = categories.find(cat => cat.id === categoryId)?.categoryTypes || [];

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const { data } = await fetchCategories();
                setCategories(data);
            } catch (err) {
                console.error(err.message);
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        if (categoryId && !categoryTypes.some(type => type.id === value)) {
            onChange('');
        }
        // We only want to run this when categoryId or categoryTypes change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, categoryTypes]);

    return (
        <div>
            <label className="block">Category Type</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border p-2 w-full rounded"
                disabled={!categoryTypes.length}
                required
            >
                <option value="">Select Category Type</option>
                {categoryTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                ))}
            </select>
            {!categoryTypes.length && (
                <p className="text-sm text-gray-500">No category types available for this category</p>
            )}
        </div>
    );
};

export default CategoryTypeInput;