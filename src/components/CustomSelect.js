'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import styles from '../app/customers/form.module.css';

export default function CustomSelect({ options, value, onChange, name, placeholder = "Select option", disabled = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const selectRef = useRef(null);
    const searchInputRef = useRef(null);

    // Find the selected option label
    const selectedOption = options.find(opt =>
        typeof opt === 'object' ? opt.value === value : opt === value
    );
    const displayValue = selectedOption
        ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption)
        : placeholder;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        } else {
            setSearchQuery(''); // Clear search when closed
        }
    }, [isOpen]);

    const handleSelect = (option) => {
        if (disabled) return;
        const val = typeof option === 'object' ? option.value : option;
        onChange({ target: { name, value: val } });
        setIsOpen(false);
    };

    const filteredOptions = options.filter(opt => {
        const label = typeof opt === 'object' ? opt.label : opt;
        return label.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className={styles.customSelectWrapper} ref={selectRef} style={disabled ? { opacity: 0.7, cursor: 'not-allowed' } : {}}>
            <div
                className={`${styles.customSelectHeader} ${isOpen ? styles.customSelectOpen : ''}`}
                onClick={() => { if (!disabled) setIsOpen(!isOpen); }}
                style={disabled ? { backgroundColor: '#f8fafc' } : {}}
            >
                <span className={displayValue === placeholder ? styles.customSelectPlaceholder : ''}>
                    {displayValue}
                </span>
                <ChevronDown size={16} className={`${styles.customSelectIcon} ${isOpen ? styles.customSelectIconOpen : ''}`} />
            </div>

            {isOpen && (
                <div className={styles.customSelectList}>
                    <div className={styles.customSelectSearch}>
                        <Search size={14} className={styles.customSelectSearchIcon} />
                        <input
                            ref={searchInputRef}
                            type="text"
                            className={styles.customSelectSearchInput}
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking input
                        />
                    </div>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt, i) => {
                            const val = typeof opt === 'object' ? opt.value : opt;
                            const label = typeof opt === 'object' ? opt.label : opt;
                            const isSelected = value === val;

                            return (
                                <div
                                    key={i}
                                    className={`${styles.customSelectItem} ${isSelected ? styles.customSelectItemSelected : ''}`}
                                    onClick={() => handleSelect(opt)}
                                >
                                    {label}
                                </div>
                            );
                        })
                    ) : (
                        <div className={styles.customSelectNoResult}>No options found</div>
                    )}
                </div>
            )}
        </div>
    );
}
