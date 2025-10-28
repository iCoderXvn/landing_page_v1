"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  Trash2,
  Plus,
  Tag,
  GripVertical,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useRouter } from "next/navigation";

interface Topic {
  id: number;
  name: string;
  description: string | null;
  color: string;
  createdAt: Date;
  postCount?: number;
}

interface TopicFormData {
  name: string;
  description: string;
  color: string;
}

const COLOR_PRESETS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Orange", value: "#F97316" },
  { name: "Cyan", value: "#06B6D4" },
];

export default function TopicsManagementPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<Topic | null>(null);
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [reassignFromId, setReassignFromId] = useState<number | null>(null);
  const [reassignToId, setReassignToId] = useState<number | null>(null);

  const [formData, setFormData] = useState<TopicFormData>({
    name: "",
    description: "",
    color: COLOR_PRESETS[0].value,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TopicFormData, string>>>({});

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/topics?includePostCount=true");
      const data = await response.json();
      if (data.success) {
        setTopics(data.topics);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (topic?: Topic) => {
    if (topic) {
      setEditingTopic(topic);
      setFormData({
        name: topic.name,
        description: topic.description || "",
        color: topic.color || COLOR_PRESETS[0].value,
      });
    } else {
      setEditingTopic(null);
      setFormData({
        name: "",
        description: "",
        color: COLOR_PRESETS[0].value,
      });
    }
    setErrors({});
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingTopic(null);
    setFormData({
      name: "",
      description: "",
      color: COLOR_PRESETS[0].value,
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TopicFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Topic name is required";
    }

    if (!formData.color) {
      newErrors.color = "Color is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const url = editingTopic
        ? `/api/topics/${editingTopic.id}`
        : "/api/topics";
      const method = editingTopic ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchTopics();
        handleCloseDialog();
      } else {
        alert(data.error || `Failed to ${editingTopic ? "update" : "create"} topic`);
      }
    } catch (error) {
      console.error("Error saving topic:", error);
      alert(`Failed to ${editingTopic ? "update" : "create"} topic`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (topic: Topic) => {
    setTopicToDelete(topic);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!topicToDelete) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/topics/${topicToDelete.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await fetchTopics();
        setShowDeleteDialog(false);
        setTopicToDelete(null);
      } else {
        alert(data.error || "Failed to delete topic");
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
      alert("Failed to delete topic");
    } finally {
      setSaving(false);
    }
  };

  const handleReassignClick = (topicId: number) => {
    setReassignFromId(topicId);
    setReassignToId(null);
    setShowReassignDialog(true);
  };

  const handleReassign = async () => {
    if (!reassignFromId || !reassignToId) {
      alert("Please select a target topic");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/posts/bulk-reassign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromTopicId: reassignFromId,
          toTopicId: reassignToId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchTopics();
        setShowReassignDialog(false);
        setReassignFromId(null);
        setReassignToId(null);
        alert(`Successfully reassigned ${data.count} post(s)`);
      } else {
        alert(data.error || "Failed to reassign posts");
      }
    } catch (error) {
      console.error("Error reassigning posts:", error);
      alert("Failed to reassign posts");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    localStorage.removeItem("authToken");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminSidebar onLogout={handleLogout} />
      
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Topics Management</h2>
                <p className="text-gray-400 mt-1">Organize your blog posts by topics</p>
              </div>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Topic
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {topics.length}
                      </div>
                      <div className="text-sm text-gray-400">Total Topics</div>
                    </div>
                    <Tag className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {topics.reduce((sum, t) => sum + (t.postCount || 0), 0)}
                      </div>
                      <div className="text-sm text-gray-400">Total Posts</div>
                    </div>
                    <FileText className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/90 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {topics.filter(t => (t.postCount || 0) > 0).length}
                      </div>
                      <div className="text-sm text-gray-400">Active Topics</div>
                    </div>
                    <CheckCircle className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Topics Table */}
            <Card className="bg-gray-900/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">All Topics</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-gray-800/50">
                        <TableHead className="w-12">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                        </TableHead>
                        <TableHead>Topic</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Color</TableHead>
                        <TableHead>Posts</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : topics.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No topics found. Create your first topic to get started.
                          </TableCell>
                        </TableRow>
                      ) : (
                        topics.map((topic) => (
                          <TableRow
                            key={topic.id}
                            className="border-gray-800 hover:bg-gray-800/50"
                          >
                            <TableCell>
                              <GripVertical className="w-4 h-4 text-gray-500 cursor-move" />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: topic.color }}
                                />
                                <span className="font-medium text-white">{topic.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-400 max-w-md">
                              <div className="truncate">
                                {topic.description || "—"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                style={{
                                  borderColor: topic.color,
                                  color: topic.color,
                                  backgroundColor: `${topic.color}15`,
                                }}
                              >
                                {topic.color}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {topic.postCount || 0} post{topic.postCount !== 1 ? "s" : ""}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-400 text-sm">
                              {new Date(topic.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleOpenDialog(topic)}
                                  title="Edit topic"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                {(topic.postCount || 0) > 0 && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleReassignClick(topic.id)}
                                    title="Reassign posts"
                                    className="text-blue-400 hover:text-blue-300"
                                  >
                                    <FileText className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteClick(topic)}
                                  className="text-red-400 hover:text-red-300"
                                  title="Delete topic"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>
              {editingTopic ? "Edit Topic" : "Create New Topic"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingTopic
                ? "Update the topic information below."
                : "Add a new topic to organize your blog posts."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">
                Topic Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Technology, Business, Lifestyle"
                className="mt-1.5 bg-gray-800 border-gray-600 text-white"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of the topic..."
                className="mt-1.5 bg-gray-800 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Color *</Label>
              <div className="grid grid-cols-5 gap-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: preset.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.color === preset.value
                        ? "border-blue-500 scale-105"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                    title={preset.name}
                  >
                    <div
                      className="w-full h-8 rounded"
                      style={{ backgroundColor: preset.value }}
                    />
                  </button>
                ))}
              </div>
              {errors.color && (
                <p className="text-red-400 text-sm mt-1">{errors.color}</p>
              )}
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: formData.color }}
              />
              <span className="text-sm text-gray-300">Preview:</span>
              <Badge
                variant="outline"
                style={{
                  borderColor: formData.color,
                  color: formData.color,
                  backgroundColor: `${formData.color}15`,
                }}
              >
                {formData.name || "Topic Name"}
              </Badge>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              disabled={saving}
              className="border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving
                ? editingTopic
                  ? "Updating..."
                  : "Creating..."
                : editingTopic
                ? "Update Topic"
                : "Create Topic"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              Delete Topic
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete "{topicToDelete?.name}"?
              {topicToDelete && (topicToDelete.postCount || 0) > 0 && (
                <span className="block mt-2 text-yellow-400">
                  Warning: This topic has {topicToDelete.postCount} post(s). The posts will
                  remain but will be unassigned.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false);
                setTopicToDelete(null);
              }}
              disabled={saving}
              className="border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={saving}
            >
              {saving ? "Deleting..." : "Delete Topic"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reassign Posts Dialog */}
      <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Reassign Posts</DialogTitle>
            <DialogDescription className="text-gray-400">
              Move all posts from{" "}
              <span className="text-white font-medium">
                {topics.find((t) => t.id === reassignFromId)?.name}
              </span>{" "}
              to another topic.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300">Target Topic *</Label>
              <Select
                value={reassignToId?.toString()}
                onValueChange={(v) => setReassignToId(parseInt(v))}
              >
                <SelectTrigger className="mt-1.5 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Select target topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics
                    .filter((t) => t.id !== reassignFromId)
                    .map((topic) => (
                      <SelectItem key={topic.id} value={topic.id.toString()}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: topic.color }}
                          />
                          {topic.name}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {reassignFromId && (
              <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                <p className="text-sm text-blue-300">
                  {topics.find((t) => t.id === reassignFromId)?.postCount || 0} post(s)
                  will be reassigned to the selected topic.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowReassignDialog(false);
                setReassignFromId(null);
                setReassignToId(null);
              }}
              disabled={saving}
              className="border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReassign}
              disabled={saving || !reassignToId}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving ? "Reassigning..." : "Reassign Posts"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
