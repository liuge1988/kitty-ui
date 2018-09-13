<template>
  <div class="container" style="width:100%;">
	<!--工具栏-->
	<div class="toolbar" style="float:left; padding:18px;">
		<el-form :inline="true" :model="filters" size="small">
			<el-form-item>
				<el-input v-model="filters.name" placeholder="用户名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" v-on:click="findUsers">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleAdd">新增</el-button>
			</el-form-item>
		</el-form>
	</div>
	<!--内容栏-->
	<el-table :data="users" stripe highlight-current-row v-loading="dataLoading" @selection-change="selectionChange" 
		style="width:100%;" max-height="420" size="mini" align="left">
		<el-table-column type="selection" width="40"></el-table-column>
		<el-table-column prop="id" label="ID" min-width="40" sortable></el-table-column>
		<el-table-column prop="name" label="用户名" min-width="120" sortable></el-table-column>
		<el-table-column prop="deptName" label="机构" min-width="120" sortable></el-table-column>
		<el-table-column prop="email" label="邮箱" min-width="120" sortable></el-table-column>
		<el-table-column prop="mobile" label="手机" min-width="120" sortable></el-table-column>
		<el-table-column label="操作" width="150" fixed="right">
			<template slot-scope="scope">
				<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				<el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
	<!--分页栏-->
	<div class="toolbar" style="padding:10px;">
		<el-button size="mini" type="danger" @click="batchDelete" :disabled="this.selections.length===0" style="float:left;">批量删除</el-button>
		<el-pagination layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" 
			:current-page="pageNum" :page-size="pageSize" :total="totalSize" style="float:right;">
		</el-pagination>
	</div>
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm">
			<el-form-item label="ID" prop="id">
				<el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户名" prop="name">
				<el-input v-model="dataForm.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="机构" prop="deptName">
				<popup-tree-input 
					:data="deptData" 
					:props="deptTreeProps" 
					:prop="dataForm.deptName" 
					:nodeKey="''+dataForm.deptId" 
					:currentChangeHandle="deptTreeCurrentChangeHandle">
				</popup-tree-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="dataForm.email" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="mobile">
				<el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editDialogVisible = false">取消</el-button>
			<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import PopupTreeInput from "@/components/PopupTreeInput"
export default {
	components:{
			PopupTreeInput
	},
	data() {
		return {
			filters: {
				name: ''
			},
			users: [],	// 用户数据
			pageNum: 1,	// 分页信息
			pageSize: 8,
			totalSize: 0,
			dataLoading: false,
			selections: [], // 列表选中列

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				id: 0,
				name: '',
				password: '123456',
				deptId: 1,
				deptName: '',
				email: 'test@qq.com',
				mobile: '13889700023',
				status: 1
			},
			deptData: [],
			deptTreeProps: {
				label: 'name',
				children: 'children'
			}
		}
	},
	methods: {
		// 换页
		handleCurrentChange(pageNum) {
			this.pageNum = pageNum
			this.findUsers()
		},
		// 获取用户列表
		findUsers() {
			this.dataLoading = true
			let params = {
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				// columnFilters:{name: {name:'name', value:this.filters.name}}
			}
			this.$api.user.findPage(params).then((res) => {
				this.totalSize = res.data.totalSize
				this.users = res.data.content
				this.dataLoading = false
			})
		},
		// 删除
		handleDel: function (index, row) {
			let ids = row.id
			this.delete(ids)
		},
		// 批量删除
		batchDelete: function () {
			let ids = this.selections.map(item => item.id).toString()
			this.delete(ids)
		},
		// 删除操作
		delete: function (ids) {
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				this.dataLoading = true
				let params = []
				let idArray = (ids+'').split(',')
				for(var i=0; i<idArray.length; i++) {
					params.push({'id':idArray[i]})
				}
				this.$api.user.batchDelete(params).then((res) => {
					this.dataLoading = false
					this.$message({
						message: '删除成功',
						type: 'success'
					})
					this.findUsers()
				})
			}).catch(() => {
			})
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				id: 0,
				name: '',
				password: '',
				deptId: 1,
				deptName: '',
				email: 'test@qq.com',
				mobile: '13889700023',
				status: 1
			}
		},
		// 显示编辑界面
		handleEdit: function (index, row) {
			this.editDialogVisible = true
			this.operation = false
			this.dataForm = Object.assign({}, row)
		},
		// 编辑
		editSubmit: function () {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true
						let params = Object.assign({}, this.dataForm)
						this.$api.user.save(params).then((res) => {
							this.editLoading = false
							this.$message({
								message: '提交成功',
								type: 'success'
							})
							this.$refs['dataForm'].resetFields()
							this.editDialogVisible = false
							this.findUsers()
						})
					})
				}
			})
		},
		selectionChange: function (selections) {
			this.selections = selections
		},
		// 获取部门列表
		findDeptTree: function () {
			this.$api.dept.findDeptTree().then((res) => {
				this.deptData = res.data
			})
		},
		// 菜单树选中
      	deptTreeCurrentChangeHandle (data, node) {
        	this.dataForm.deptId = data.id
        	this.dataForm.deptName = data.name
      	}
	},
	mounted() {
		this.findUsers()
		this.findDeptTree()
	}
}
</script>

<style scoped>

</style>