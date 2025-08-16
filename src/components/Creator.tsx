import { useState } from "react";

type CreatorProps = {
    id: number;
    level: number;
    DeleteChild?: (id: number) => void;
};

function Creator({ id, level, DeleteChild }: CreatorProps) {
    const [children, setChildren] = useState<number[]>([]);
    const [nextId, setNextId] = useState(1);
    const handleAdd = () => {
        setChildren([...children, nextId]);
        setNextId(nextId + 1);
    };
    const handleDelete = () => {
        if (DeleteChild) {
            DeleteChild(id);
        }
    };
    return (
        <div
            style={{
                marginLeft: level * 20,
                padding: 8,
                fontSize: "20px",
            }}
        >
            <span style={{ marginRight: 8 }}>-{id}</span>
            <button style={{ marginRight: 6 }} onClick={handleAdd}>
                +
            </button>
            <button onClick={handleDelete}>-</button>
            <div>
                {children.map((childId) => (
                    <Creator
                        key={childId}
                        id={childId}
                        level={level + 1}
                        DeleteChild={(deleteId) =>
                            setChildren(
                                children.filter((child) => child !== deleteId)
                            )
                        }
                    />
                ))}
            </div>
        </div>
    );
}
export default Creator;
