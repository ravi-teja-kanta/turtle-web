import { supabase } from "./supabase";


export function buildBaseRepository<DTO>(tableName: string, primaryKeyName?: string) {
    
    const primaryKey = primaryKeyName || "id";

    async function insertBulk(rows: DTO[]): Promise<DTO> {
        const { data, error } = await supabase
                .from(tableName)
                .insert(rows)
        if (error) {
            console.log(error)
            throw Error(error.message);
        }
        return data.pop()!!
    }
    async function insert(row: DTO): Promise<DTO> {
        const { data, error } = await supabase
                .from(tableName)
                .insert([
                    row
                ])
        if (error) {
            console.log(error)
            throw Error(error.message);
        }
        return data.pop()!!
    }
    async function updateById(row: Partial<DTO>): Promise<DTO> {
        // @ts-ignore
        if (!row[primaryKey]) {
            throw Error(`Update Failed : Primary Key Missing : ${row} : table: ${tableName}`)
        }
        const { data, error } = await supabase
                .from(tableName)
                .update({...row})
                //@ts-ignore
                .eq(primaryKey, row[primaryKey])
        if (error) {
            console.log(error)
            throw Error(error.message);
        }
        return data.pop()!!
    }

    async function upsert(row: DTO): Promise<DTO> {
        // @ts-ignore
        if (!row[primaryKey]) {
            throw Error(`UPSERT_FAILED : Primary Key does not exist when upsertingRecord: ${row} : table: ${tableName}`)
        }
        const { data, error } = await supabase
                .from(tableName)
                .upsert([
                    row
                ])
        if (error) {
            console.log(error)
            throw Error(error.message);
        }
        return data.pop()!!
    }

    async function deleteById(id: string): Promise<DTO> {
        
        const { data, error } = await supabase
                    .from(tableName)
                    .delete()
                    .eq(primaryKey, id)
        if (error) {
            console.log(error)
            throw Error(error.message);
        }
        return data.pop()!!
    }

    async function read(id: string): Promise<DTO> {
        const { data, error } = await supabase
                .from(tableName)
                .select("*")
                .eq(primaryKey, id)
        if (error) {
            console.log(error)
            throw Error(error.message);
        }
        const result = data.pop();
        if (!result) {
            throw new Error(`RECORD_NOT_FOUND for id: ${id} in table ${tableName}`);
        }
        return result;
    }

    return {
        insert,
        insertBulk,
        updateById,
        upsert,
        read,
        deleteById
    }
}