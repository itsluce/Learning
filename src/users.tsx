const Users = () => {

    const users = [
        {id: 1, name: 'Alice', age: 28, email: 'alice@example.com'},
        {id: 2, name: 'Bob', age: 34, email: 'bob@example.com'},
        {id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com'}
    ]

    return (
        <div>
            {users.map((item) => {
                return (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <h2>{item.email}</h2>
                    </div>
                )
            })}
        </div>
    )
}
export default Users